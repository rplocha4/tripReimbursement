import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class DailyAllowanceTest {

    @Test
    void testClaim() {
        DailyAllowance dailyAllowance = new DailyAllowance(5);
        dailyAllowance.setRate(20);

        double claimedAmount = dailyAllowance.claim();
        assertEquals(5 * 20, claimedAmount);
    }

}
