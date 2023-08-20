import org.junit.jupiter.api.Test;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ReimbursementDataTest {

    @Test
    void testGettersAndSetters() {
        Map<String, Double> receiptTypes = Map.of("Taxi", 20.0, "Hotel", 500.0, "Plane", 1000.0, "Train", 200.0);
        Map<String, Double> limits = Map.of("total", 2000.0, "mileage", 200.0);
        int dailyAllowanceRate = 5;
        double mileageRate = 0.45;

        ReimbursementData reimbursementData = new ReimbursementData(receiptTypes, limits, dailyAllowanceRate, mileageRate);

        assertEquals(receiptTypes, reimbursementData.getReceiptTypes());
        assertEquals(limits, reimbursementData.getLimits());
        assertEquals(dailyAllowanceRate, reimbursementData.getDailyAllowanceRate());
        assertEquals(mileageRate, reimbursementData.getMileageRate());
    }

}
