public class Mileage implements Claimable {
    private int amount;
    private double distanceLimit;
    private double rate;

    public Mileage() {
    }

    public Mileage(int amount, double distanceLimit, double rate) {
        this.amount = amount;
        this.distanceLimit = distanceLimit;
        this.rate = rate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Mileage(int amount) {
        this(amount,0.0,0.3);

    }
    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public void setDistanceLimit(Double distanceLimit) {
        this.distanceLimit = distanceLimit;
    }

    public double getDistanceLimit() {
        return distanceLimit;
    }

    @Override
    public double claim() {
        if (distanceLimit != 0 && amount > distanceLimit) return distanceLimit * rate;
        return amount * rate;
    }

    @Override
    public String toString() {
        return "Mileage{" +
                "amount=" + amount +
                ", distanceLimit=" + distanceLimit +
                ", rate=" + rate +
                '}';
    }
}
