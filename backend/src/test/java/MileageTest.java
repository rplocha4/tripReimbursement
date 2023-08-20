import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class MileageTest {

    @Test
    void testClaimWithinLimit() {
        Mileage mileage = new Mileage(100, 150.0, 0.25);
        double claimedAmount = mileage.claim();
        assertEquals(100 * 0.25, claimedAmount);
    }

    @Test
    void testClaimExceedingLimit() {
        Mileage mileage = new Mileage(200, 150.0, 0.25);
        double claimedAmount = mileage.claim();
        assertEquals(150.0 * 0.25, claimedAmount);
    }

    @Test
    void testClaimWithoutLimit() {
        Mileage mileage = new Mileage(300, 0.0, 0.3);
        double claimedAmount = mileage.claim();
        assertEquals(300 * 0.3, claimedAmount);
    }


}
