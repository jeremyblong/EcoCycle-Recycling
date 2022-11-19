import React, { Fragment } from 'react';
import { View } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';

const SearchingResultsLocationHelper = ({ hits, hasMore, refineNext }) => {
    

    return (
        <Fragment>

        </Fragment>
    );
}

// [...]

export default connectInfiniteHits(SearchingResultsLocationHelper);