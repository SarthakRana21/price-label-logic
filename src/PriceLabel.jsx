import { useEffect, useState } from "react";
import "./App.css";

export default function PriceLabel() {
  const [value, setValue] = useState("");
  const [good, setGood] = useState(false);
  const [high, setHigh] = useState(false);
  const [veryHigh, setVeryHigh] = useState(false);
  const [great, setGreat] = useState(false);
  const [best, setBest] = useState(false);

  const allPriceStatusFalse = () => {
    setHigh(false);
    setGood(false);
    setVeryHigh(false);
    setGreat(false);
    setBest(false);
  };

  // thousand comma pattern regex logic
  const formatNumber = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleOnchange = (e) => {
    let rawValue = e.target.value;
    const formattedValue = formatNumber(rawValue);
    setValue(formattedValue)
    
    // setValue(e.target.value);
  };
  const priceLabel = (price) => {

    const prevPrice = [10000, 80009, 50000, 110000, 90000, 114000, 120000];
    const mean = prevPrice.reduce((acc, curr) => acc + curr, 0) / prevPrice.length;
    // console.log(mean.toFixed(2));
    const tenP = mean * 0.1;
    const thirtyP = mean * 0.3;

    if (mean + tenP < price && price < mean + thirtyP) {
      allPriceStatusFalse();
      setHigh(true);
    } else if (mean + thirtyP < price) {
      allPriceStatusFalse();
      setVeryHigh(true);
    } else if (mean - tenP > price && price > mean - thirtyP) {
      allPriceStatusFalse();
      setGreat(true);
    } else if (mean - thirtyP > price && price > 0) {
      allPriceStatusFalse();
      setBest(true);
    } else if (price > 0) {
      allPriceStatusFalse();
      setGood(true);
    }
  };
  useEffect(() => {
    if (value) {
      // Converting the string value back to a number, removing the commas (priceLabel fn only takes nums)
      const num = parseFloat(value.replace(/,/g, ""));
       // console.log('type: ', typeof num);
      if (num > 0) {
        priceLabel(num);
      } else {
        allPriceStatusFalse();
      }
    } else {
      allPriceStatusFalse();
    }
  }, [value]);

  return (
    <div className="App">
      <input type="text" value={value} onChange={handleOnchange} min={0} placeholder="Enter your Price" required />
      <br />
      { best && <div>
        <img src={'/best-price.png'} alt="Best Price" width={100} height={50} />
        <br />
        <span>Best Price</span>
        </div> }
      { great && <div>
        <img src={'/public/great-price.png'} alt="Great Price" width={100} height={50} />
        <br />
        <span>Great Price</span>
        </div>}
      { good && <div>
        <img src={'/good-price.png'} alt="Good Price" width={100} height={50} />
        <br />
        <span>Good Price</span>
        </div> }
      { high && <div><img src={'/high-price.png'} alt="High Price" width={100} height={50} />
        <br />
        <span>High Price</span>
        </div> }
      { veryHigh && <div>
        <img src={'/very-high-price.png'} alt="Very High Price" width={100} height={50} />
        <br />
        <span>Very High Price</span></div> }
    </div>
  );
}
