
import java.util.List;

public class Reimbursement {
    private double limit;
    private List<Receipt> receipts;
    private DailyAllowance dailyAllowance;
    private Mileage mileage;

    public Reimbursement() {
    }

    public Reimbursement(double limit, List<Receipt> receipts, DailyAllowance dailyAllowance, Mileage mileage) {
        this.limit = limit;
        this.receipts = receipts;
        this.dailyAllowance = dailyAllowance;
        this.mileage = mileage;
    }

    public double getLimit() {
        return limit;
    }

    public void setLimit(double limit) {
        this.limit = limit;
    }

    public List<Receipt> getReceipts() {
        return receipts;
    }

    public void setReceipts(List<Receipt> receipts) {
        this.receipts = receipts;
    }

    public DailyAllowance getDailyAllowance() {
        return dailyAllowance;
    }

    public void setDailyAllowance(DailyAllowance dailyAllowance) {
        this.dailyAllowance = dailyAllowance;
    }

    public Mileage getMileage() {
        return mileage;
    }

    public void setMileage(Mileage mileage) {
        this.mileage = mileage;
    }

    public double calculateTotal(){
        double total = 0;
        if (dailyAllowance != null)
            total+=dailyAllowance.claim();
        if (mileage != null)
            total+=mileage.claim();
        if (receipts!=null)
            for(Receipt r:receipts){
                total+=r.claim();
            }
        if (limit != 0.0 && total > limit) return limit;
        return total;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "limit=" + limit +
                ", receipts=" + receipts +
                ", dailyAllowance=" + dailyAllowance +
                ", mileage=" + mileage +
                '}';
    }
}
