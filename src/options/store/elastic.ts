import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import _get from 'lodash.get';

interface ElasticState {
  baseUrl: string;
  indexPattern: string;
  currentFields: string[];
  currentField: string;
  result: any;
  setBaseUrl: (baseUrl: string) => void;
  setIndexPattern: (indexPattern: string) => void;
  getStats: () => Promise<any>;
  getMapping: () => Promise<any>;
  clear: () => void;
}

const base: any = ({ baseUrl, indexPattern }) => `${baseUrl}/${indexPattern}`;

export const useElasticStore = create<ElasticState>()(
  persist(
    (set, get) => ({
      baseUrl: '',
      indexPattern: '',
      currentFields: [],
      currentField: '',
      result: null,

      setBaseUrl: (baseUrl: string) => set({ baseUrl }),
      setIndexPattern: (indexPattern: string) => set({ indexPattern }),
      clear: () =>
        set({
          currentFields: [],
          result: null,
        }),

      async getStats() {
        const response = await axios.get(`${base(get())}/_stats`);
        set({ result: response.data });
        return response.data;
      },

      async getMapping() {
        const response = await axios.get(`${base(get())}/_mapping`);

        const indices = Object.keys(response.data);

        indices.forEach((index) => {
          const properties = response.data[index].mappings.properties;

          const fields = [];

          function getField(field) {
            fields.push(field);
            const property = _get(properties, field);
            if (property?.properties) {
              Object.keys(property.properties).forEach((property) => {
                getField(`${field}.${property}`);
              });
            }
          }
          Object.keys(properties).forEach((property) => {
            getField(property);
          });
          set({ currentFields: fields });
        });
        return response.data;
      },

      async filter(field: string, value: any) {
        const response = await axios.get(`${base(get())}/_stats`);
        set({ result: response.data });
        return response.data;
      },
    }),
    {
      name: 'elastic-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
