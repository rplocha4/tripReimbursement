import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ReceiptTest {

    @Test
    void testClaimWithoutLimit() {
        Receipt receipt = new Receipt("Hotel", 100.0);
        double claimedAmount = receipt.claim();
        assertEquals(100.0, claimedAmount);
    }

    @Test
    void testClaimWithLimitExceeded() {
        Receipt receipt = new Receipt("Flight", 500.0, 700.0);
        double claimedAmount = receipt.claim();
        assertEquals(500.0, claimedAmount);
    }

    @Test
    void testClaimWithLimitNotExceeded() {
        Receipt receipt = new Receipt("Taxi", 30.0, 20.0);
        double claimedAmount = receipt.claim();
        assertEquals(20.0, claimedAmount);
    }


}
