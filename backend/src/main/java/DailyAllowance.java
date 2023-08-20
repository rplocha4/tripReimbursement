public class DailyAllowance implements Claimable{
    private int nDays;
    private int rate;

    public DailyAllowance() {
    }

    public DailyAllowance(int nDays) {
        this.nDays = nDays;
        this.rate = 15;
    }

    public int getnDays() {
        return nDays;
    }

    public void setnDays(int nDays) {
        this.nDays = nDays;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public int getRate() {
        return rate;
    }

    @Override
    public double claim() {
        return nDays * rate;
    }

    @Override
    public String toString() {
        return "DailyAllowance{" +
                "nDays=" + nDays +
                ", rate=" + rate +
                '}';
    }
}
