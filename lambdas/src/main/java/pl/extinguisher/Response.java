package pl.extinguisher;

public final class Response {
    public static String getMessage(String message) {
        return "{ \"message\": \"" + message + "\" }";
    }

    public static String getMessage(String message, String error) {
        return "{ \"message\": \"" + message + "\", \"error\": \"" + error + "\" }";
    }

}