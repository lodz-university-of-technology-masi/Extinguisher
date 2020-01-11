package pl.extinguisher;

import java.util.Map;
import java.util.HashMap;

import com.google.gson.Gson;

class ApiGatewayResponse {
    private Integer statusCode;
    private String body;
    private Boolean base64Encoded;
    private Map<String, String> headers;


    ApiGatewayResponse(Integer statusCode, String body) {
        this.statusCode = statusCode;
        this.body = body;
        this.base64Encoded = false;

        Map<String, String> headers = new HashMap<String, String>();
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Content-Type", "text/plain");
        this.headers = headers;

    }

    @Override
    public String toString(){
        Map<String, Object> res = new HashMap<String, Object>();
        res.put("statusCode", statusCode);
        res.put("body", body);
        res.put("isBase64Encoded", base64Encoded);
        res.put("headers", headers);

        Gson gsonObj = new Gson();
        String jsonStr = gsonObj.toJson(res);

        return jsonStr;
    }

    public String getBody() {
		return body;
	}

	public Map<String, String> getHeaders() {
		return headers;
    }
    
    public int getStatusCode() {
		return statusCode;
	}
	// APIGW expects the property to be called "isBase64Encoded"
	public boolean isBase64Encoded() {
		return base64Encoded;
	}
}