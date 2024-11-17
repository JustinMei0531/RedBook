type apiType = {
    url: string,
    method: "get" | "post" | "put" | "delete"
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiEndpoint {
    url: string;
    method: HttpMethod;
}

interface ApiEndpoints {
    [key: string]: ApiEndpoint;
}


