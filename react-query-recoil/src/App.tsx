import { useRecoilState, useRecoilValue } from "recoil";
import Router from "./Router";
import { hourSelector, minuteState } from "./Components/atoms";

function App() {
  const [minute, setMinute] = useRecoilState(minuteState);
  const hourValue = useRecoilValue(hourSelector);

  const onChangeMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    // 숫자값으로 들어가야해서 변환해줌 앞에 +를 해서 변환해줌 << 알아두자
    // Number(event.currentTarget.value) 해줘도됨
    setMinute(value);
  };

  return (
    <>
      <Router />
      <input
        value={minute}
        onChange={onChangeMinute}
        className="border-2"
        type="number"
        placeholder="Minute"
      ></input>
      <input
        value={hourValue}
        className="border-2"
        type="number"
        placeholder="Hours"
      ></input>
    </>
  );
}

export default App;
