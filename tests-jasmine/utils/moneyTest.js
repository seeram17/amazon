import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite case : format Currency',()=>{

    it('Test: Converts cents to dollars',()=>{
        expect(formatCurrency(2095)).toEqual("$20.95");
    });

    it('Test: Handles zero amount',()=>{
        expect(formatCurrency(0)).toEqual("$0.00");
    });

    it('Test: Rounds decimal cents up',()=>{
        expect(formatCurrency(2000.5)).toEqual("$20.01");
    });

    it('Test: Rounds decimal cents dpwn',()=>{
        expect(formatCurrency(2000.4)).toEqual("$20.00");
    });
});
