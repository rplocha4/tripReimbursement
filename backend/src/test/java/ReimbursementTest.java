import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

public class ReimbursementTest {

    @Test
    void testCalculateTotalWithNoItems() {
        Reimbursement reimbursement = new Reimbursement();
        double total = reimbursement.calculateTotal();
        assertEquals(0.0, total);
    }

    @Test
    public void testCalculateTotalWithDailyAllowance() {
        DailyAllowance dailyAllowance = new DailyAllowance(5);
        Reimbursement reimbursement = new Reimbursement();
        reimbursement.setDailyAllowance(dailyAllowance);

        double expectedTotal = 75.0;
        double actualTotal = reimbursement.calculateTotal();

        assertEquals(expectedTotal, actualTotal, 0.01);
    }


    @Test
    void testCalculateTotalWithMileage() {
        Mileage mockMileage = mock(Mileage.class);
        when(mockMileage.claim()).thenReturn(30.0);

        Reimbursement reimbursement = new Reimbursement();
        reimbursement.setMileage(mockMileage);

        double total = reimbursement.calculateTotal();
        assertEquals(30.0, total);
    }

    @Test
    void testCalculateTotalWithReceipts() {
        Receipt receipt1 = new Receipt("Hotel", 40.0);
        Receipt receipt2 = new Receipt("Taxi", 15.0);
        List<Receipt> receipts = new ArrayList<>();
        receipts.add(receipt1);
        receipts.add(receipt2);

        Reimbursement reimbursement = new Reimbursement();
        reimbursement.setReceipts(receipts);

        double total = reimbursement.calculateTotal();
        assertEquals(55.0, total);
    }

    @Test
    void testCalculateTotalWithLimitExceeded() {
        DailyAllowance mockDailyAllowance = mock(DailyAllowance.class);
        when(mockDailyAllowance.claim()).thenReturn(70.0);

        Reimbursement reimbursement = new Reimbursement();
        reimbursement.setDailyAllowance(mockDailyAllowance);
        reimbursement.setLimit(50.0);

        double total = reimbursement.calculateTotal();
        assertEquals(50.0, total);
    }

}
