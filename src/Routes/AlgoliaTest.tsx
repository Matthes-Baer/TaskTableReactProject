// Algolia:
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination, usePagination } from 'react-instantsearch-hooks-web';
const searchClient = algoliasearch('7KW5WV57HR', 'd1c4587302346684667a1b42f201eb9f');

function Hit({ hit }: any) {
    return (
      <article>
        <img src={hit.image} />
      </article>
    );
  }

  const AlgoliaTest = () => {
    return (
        <div className="App">
            <InstantSearch searchClient={searchClient} indexName="testIndex">
                <SearchBox />
                <Hits hitComponent={Hit} />
                <Pagination />
            </InstantSearch>
        </div>
    )
}

export default AlgoliaTest;