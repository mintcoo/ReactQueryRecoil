import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "../Components/atoms";

function RecoilSelector() {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  // selector를 useRecoilState로 쓰면 get값(첫인자)과 set값(두번째 인자)에 접근

  const onChangeMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    // 숫자값으로 들어가야해서 변환해줌 앞에 +를 해서 변환해줌 << 알아두자
    // Number(event.currentTarget.value) 해줘도됨
    setMinute(value);
  };

  const onChangeHours = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    setHours(value);
  };

  return (
    <>
      <input
        value={minute}
        onChange={onChangeMinute}
        className="border-2"
        type="number"
        placeholder="Minute"
      ></input>
      <input
        value={hours}
        onChange={onChangeHours}
        className="border-2"
        type="number"
        placeholder="Hours"
      ></input>
    </>
  );
}

export default RecoilSelector;
