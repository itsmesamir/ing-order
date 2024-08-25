import config from 'config/config';
import { createBrowserHistory } from 'history';

export default createBrowserHistory({ basename: config.appBasePath });
