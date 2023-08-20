import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Server {
    private static Map<String, Double> defaultReceipts = Map.of("Taxi", 20.0, "Hotel", 500.0, "Plane", 1000.0, "Train", 200.0);
    private static Map<String, Double> defaultLimits = Map.of("total", 2000.0, "mileage", 200.0);
    private static int defaultDailyAllowanceRate = 15;
    private static double defaultMileageRate = 0.3;
    private static ReimbursementData reimbursementData = new ReimbursementData(defaultReceipts, defaultLimits, defaultDailyAllowanceRate, defaultMileageRate);

    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        System.out.println("Server started on port " + port);

        server.createContext("/data", new GetData());

        server.createContext("/postData", new PostData());
        server.createContext("/total", new Total());

        server.start();
    }


    static class GetData implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {

            ObjectMapper objectMapper = new ObjectMapper();
            try {
                sendResponse(exchange, objectMapper.writeValueAsString(reimbursementData));
            } catch (Exception e) {
                System.out.println(e);
//                e.printStackTrace();
            }
        }
    }

    static class Total implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            InputStream requestBody = exchange.getRequestBody();
            StringBuilder sb = new StringBuilder();
            int byteRead;
            while ((byteRead = requestBody.read()) != -1) {
                sb.append((char) byteRead);
            }

            String data = sb.toString();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                Reimbursement postData = objectMapper.readValue(data, Reimbursement.class);
                postData.setLimit(reimbursementData.getLimits().get("total"));

                Mileage mileage = postData.getMileage();
                if (mileage != null) {
                    mileage.setRate(reimbursementData.getMileageRate());
                    mileage.setDistanceLimit(reimbursementData.getLimits().get("mileage"));
                }


                List<Receipt> receipts = postData.getReceipts();
                if (receipts != null) {
                    List<Receipt> receiptData = new ArrayList<>();

                    for (Receipt receipt : receipts) {
                        receiptData.add(new Receipt(receipt.getName(), reimbursementData.getReceiptTypes().get(receipt.getName()), receipt.getAmount()));

                    }
                    postData.setReceipts(receiptData);
                }

                DailyAllowance allowance = postData.getDailyAllowance();
                if (allowance != null) {
                    allowance.setRate(reimbursementData.getDailyAllowanceRate());
                }
                double total = postData.calculateTotal();
                sendResponse(exchange, objectMapper.writeValueAsString(total));

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    static class PostData implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            InputStream requestBody = exchange.getRequestBody();
            StringBuilder sb = new StringBuilder();
            int byteRead;
            while ((byteRead = requestBody.read()) != -1) {
                sb.append((char) byteRead);
            }

            String data = sb.toString();

            ObjectMapper objectMapper = new ObjectMapper();
            try {
                Map<String, Object> requestData = objectMapper.readValue(data, new TypeReference<Map<String, Object>>() {
                });

                Map<String, Object> rawReceipts = (Map<String, Object>) requestData.get("receipts");
                Map<String, Double> receipts = new HashMap<>();

                for (Map.Entry<String, Object> entry : rawReceipts.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();

                    if (value instanceof Number) {
                        receipts.put(key, ((Number) value).doubleValue());
                    }
                }
                Map<String, Object> rawLimits = (Map<String, Object>) requestData.get("limits");
                Map<String, Double> limits = new HashMap<>();

                for (Map.Entry<String, Object> entry : rawLimits.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();

                    if (value instanceof Number) {
                        limits.put(key, ((Number) value).doubleValue());
                    }
                }
                int dailyAllowanceRate = (int) requestData.get("dailyAllowanceRate");
                double mileageRate = (double) requestData.get("mileageRate");

                reimbursementData = new ReimbursementData(receipts, limits, dailyAllowanceRate, mileageRate);
            } catch (Exception e) {
                e.printStackTrace();
                sendResponse(exchange, objectMapper.writeValueAsString("fail"));
            }
            sendResponse(exchange, objectMapper.writeValueAsString("success"));
        }
    }

    private static void sendResponse(HttpExchange exchange, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
        exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(response.getBytes(StandardCharsets.UTF_8));
        }
    }
}
