# enhanced-fetch

增强的fetch封装



## Usage

```bash
$ npm install -S enhanced-fetch
```



```javascript
import { createRequest, applyRequestMiddleware } from 'enhanced-fetch';

const middlewares = applyRequestMiddleware(
  // some middleware for api, such as debug, log, cache, tracker and so on.
);

const request = createRequest(middlewares);

request('http://xxx.com/api', {
  params: { aaa: 'aaa' },
  method: 'post',
  timeout: 5000,
}).then(response => {
  console.log('Got server response', response);
});
```

