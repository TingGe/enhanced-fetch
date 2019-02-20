import { createRequest, applyRequestMiddleware } from "./index";
// some middleware for api, such as debug, log, cache, tracker and so on.
var middlewares = applyRequestMiddleware();
var request = createRequest(middlewares);
request("http://127.0.0.1:6001/data_engine/api/refs", {
    params: { keyword: "", owner_id: "", page: 1, per_page: 20 },
    method: "get",
    timeout: 5000
}).then(function (response) {
    console.log("Got server response", response);
});
//# sourceMappingURL=index.spec.js.map