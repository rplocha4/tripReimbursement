import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class ReimbursementData {
    @JsonProperty("receipts")
    private Map<String,Double> receiptTypes;
    @JsonProperty("limits")
    private Map<String, Double> limits;
    @JsonProperty("dailyAllowanceRate")

    private int dailyAllowanceRate;
    @JsonProperty("mileageRate")
    private double mileageRate;

    public ReimbursementData(Map<String, Double> receiptTypes, Map<String, Double> limits, int dailyAllowanceRate, double mileageRate) {
        this.receiptTypes = receiptTypes;
        this.limits = limits;
        this.dailyAllowanceRate = dailyAllowanceRate;
        this.mileageRate = mileageRate;
    }

    public Map<String, Double> getLimits() {
        return limits;
    }

    public void setLimits(Map<String, Double> limits) {
        this.limits = limits;
    }

    public int getDailyAllowanceRate() {
        return dailyAllowanceRate;
    }

    public void setDailyAllowanceRate(int dailyAllowanceRate) {
        this.dailyAllowanceRate = dailyAllowanceRate;
    }

    public double getMileageRate() {
        return mileageRate;
    }

    public void setMileageRate(double mileageRate) {
        this.mileageRate = mileageRate;
    }


    public Map<String, Double> getReceiptTypes() {
        return receiptTypes;
    }

    public void setReceiptTypes(Map<String, Double> receiptTypes) {
        this.receiptTypes = receiptTypes;
    }

    @Override
    public String toString() {
        return "ReimbursementData{" +
                "receiptTypes=" + receiptTypes +
                ", limits=" + limits +
                ", dailyAllowanceRate=" + dailyAllowanceRate +
                ", mileageRate=" + mileageRate +
                '}';
    }
}
