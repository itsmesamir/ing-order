import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { isEqual } from 'lodash';

import { parseQuery, unParseQuery } from 'utils/queryParams';
import { removeFalseValue } from 'utils/object';

import { Any } from 'types/common';

const useQuery = (
  defaultQueries: Record<string, Any> = {},
  { convertToArray = false, typeConversion = false } = {},
  saveOnURL = true
): [Record<string, Any>, (queries: Record<string, Any>) => void] => {
  const location = useLocation();
  const history = useHistory();

  const [queries, updateQuery] = useState<Record<string, Any>>({
    ...defaultQueries,
    ...(saveOnURL ? { ...parseQuery(location.search, { convertToArray, typeConversion }) } : {}),
  });

  useEffect(() => {
    if (saveOnURL) {
      const queriesFromURL = location.search;
      const parsedQueriesFromURL = parseQuery(queriesFromURL, {
        convertToArray,
        typeConversion,
      });
      const queriesFromState = removeFalseValue(queries);

      if (isEqual(parsedQueriesFromURL, queriesFromState)) {
        return;
      }

      if (!queriesFromURL) {
        history.replace({
          search: unParseQuery(queries),
        });
      } else {
        history.push({
          search: unParseQuery(queries),
        });
      }
    }
  }, [saveOnURL, queries]);

  return [queries, updateQuery];
};

export default useQuery;
