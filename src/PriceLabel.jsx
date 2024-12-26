import { useEffect, useState } from "react";
import "./App.css";

export default function PriceLabel() {
  const [value, setValue] = useState();
  const [good, setGood] = useState(false);
  const [high, setHigh] = useState(false);
  const [VeryHigh, setVeryHigh] = useState(false);
  const [great, setGreat] = useState(false);
  const [best, setBest] = useState(false);

  const allPriceStatusFalse = () => {
    setHigh(false);
    setGood(false);
    setVeryHigh(false);
    setGreat(false);
    setBest(false);
  };

  const handleOnchange = (e) => {
    setValue(e.target.value);
  };
  const priceLabel = (price) => {
    const prevPrice = [100, 89, 50, 110, 90, 114, 120];
    const mean =
      prevPrice.reduce((acc, curr) => acc + curr, 0) / prevPrice.length;
    console.log(mean.toFixed(2));
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
    if (value !== "" && value > 0) {
      priceLabel(value);
    } else {
      allPriceStatusFalse();
    }
  }, [value]);

  return (
    <div className="App">
      <input type="number" value={value} onChange={handleOnchange} min={0} placeholder="Enter your Price" pattern="" required />
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
      { VeryHigh && <div>
        <img src={'/very-high-price.png'} alt="Very High Price" width={100} height={50} />
        <br />
        <span>Very High Price</span></div> }
    </div>
  );
}
