import { ArrowRightOutlined } from "@ant-design/icons";
import { Drawer, Button, Card, Divider } from "antd";

interface Props {
  visible: boolean;
  closeHistory(): void;
  history: Array<TranslationHistory>;
  languages: Language[];
  onClearHistory?(): void;
}
const History = (props: Props) => {
  const handleClearHistory = () => {
    if (props.onClearHistory) {
      props.onClearHistory();
    }
  };
  return (
    <Drawer
      placement="right"
      title="History"
      width={500}
      visible={props.visible}
      onClose={props.closeHistory}
      extra={
        <Button type="primary" onClick={handleClearHistory}>
          Clear
        </Button>
      }
    >
      {props.history &&
        props.history.map((item) => (
          <>
            <p>
              <span className="from-lang">
                {" "}
                {props.languages.find((lang) => lang.code === item.from)?.name}
              </span>
              <ArrowRightOutlined />
              <span className="to-lang">
                {props.languages.find((lang) => lang.code === item.to)?.name}
              </span>
            </p>
            <p>{item.text}</p>
            <p>{item.response.join("\r\n")}</p>
            <Divider />
          </>
        ))}
    </Drawer>
  );
};
export default History;
