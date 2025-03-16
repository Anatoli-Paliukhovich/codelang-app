import {customFetch} from '@/utils';
import {LoaderFunction} from 'react-router-dom';
import {type SnippetsResponseWithParams} from '@/utils';

const url = '/snippets';

const loader: LoaderFunction = async ({request}) => {
    const params = new URL(request.url).searchParams;
    const query = Object.fromEntries(params.entries());
    const response = await customFetch<SnippetsResponseWithParams>(url, {
        params: query,
    });

    return {...response.data, params: query};
};

export default loader;
