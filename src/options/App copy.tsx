import { useElasticStore } from './store/elastic';

function App() {
  const baseUrl = useElasticStore((state) => state.baseUrl);
  const indexPattern = useElasticStore((state) => state.indexPattern);
  const result = useElasticStore((state) => state.result);
  const currentFields = useElasticStore((state) => state.currentFields);
  const setBaseUrl = useElasticStore((state) => state.setBaseUrl);
  const setIndexPattern = useElasticStore((state) => state.setIndexPattern);
  const getStats = useElasticStore((state) => state.getStats);
  const getMapping = useElasticStore((state) => state.getMapping);
  const clear = useElasticStore((state) => state.clear);

  return (
    <>
      <section className="flex space-x-2 m-2">
        <div className="flex items-center flex-1 space-x-2">
          <label htmlFor="base_url">Base Url</label>
          <input
            name="base_url"
            onChange={(e) => setBaseUrl(e.target.value)}
            value={baseUrl}
            type="text"
            className="flex-1 border border-gray-500 rounded-md p-2"
            placeholder="Base Url"
          />
        </div>
        <div className="flex items-center flex-1 space-x-2">
          <label htmlFor="base_url">Index Pattern</label>
          <input
            onChange={(e) => setIndexPattern(e.target.value)}
            value={indexPattern}
            type="text"
            className="flex-1 border border-gray-500 rounded-md p-2"
            placeholder="Index Pattern"
          />
        </div>
        <select name="categories" id="category">
          <option value="all">All</option>
          <option value="indices">Indices</option>
          <option value="nodes">Nodes</option>
          <option value="shards">Shards</option>
        </select>
        <button
          className="p-2 bg-green-600 rounded-md text-white"
          onClick={getStats}
        >
          Run
        </button>
        <button
          className="p-2 border rounded-md "
          onClick={getMapping}
        >
          Fields
        </button>
        <button
          className="p-2 bg-red-600 rounded-md text-white"
          onClick={clear}
        >
          Clear
        </button>
      </section>
      <section className="m-2">
        <div className="flex items-center flex-1 space-x-2">
          <label htmlFor="base_url">Where</label>
          <input
            name="base_url"
            onChange={(e) => setBaseUrl(e.target.value)}
            value={baseUrl}
            type="text"
            className="flex-1 border border-gray-500 rounded-md p-2"
            placeholder="Base Url"
          />
        </div>
      </section>
      <section className="flex">
        <section>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </section>
        <section>
          <pre>{JSON.stringify(currentFields, null, 2)}</pre>
        </section>
      </section>
    </>
  );
}

export default App;
