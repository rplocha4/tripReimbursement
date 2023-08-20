public class Receipt implements Claimable {
    private String name;
    private double amount;
    private double limit;

    public Receipt() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Receipt(String name, double limit, double amount) {
        this.name = name;
        this.limit = limit;
        this.amount= amount;
    }

    public Receipt(String name, double amount) {
        this(name, 0.0,amount);

    }

    public void setLimit(double limit) {
        this.limit = limit;
    }

    public double getLimit() {
        return limit;
    }

    @Override
    public double claim() {
        if(limit != 0.0 && amount > limit) return limit;
        return amount;
    }

    @Override
    public String toString() {
        return "Receipt{" +
                "name='" + name + '\'' +
                ", amount=" + amount +
                ", limit=" + limit +
                '}';
    }
}
