import { Col, Divider, Row, Select, Input, Button } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const languages: Language[] = require("../../../../Data/languages.json");
interface Language {
  code: string;
  name: string;
  nativeName: string;
}
const Translator = () => {
  const onChange = (e: any) => {
    console.log("Change:", e.target.value);
  };
  const handleLanguageChange = (value: string) => {};
  return (
    <>
      <Row justify="start">
        <Col span={4}> From:</Col>
        <Col span={4}>
          <Select
            showSearch
            defaultValue={"en"}
            style={{
              width: 120,
            }}
            onChange={handleLanguageChange}
          >
            {languages.map((language) => (
              <Option key={language.code}>{language.name}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col span={24}>
          <TextArea
            showCount
            maxLength={500}
            style={{
              height: 120,
            }}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row justify="start">
        <Col span={4}> To:</Col>
        <Col span={4}>
          <Select
            showSearch
            defaultValue={"en"}
            style={{
              width: 120,
            }}
            onChange={handleLanguageChange}
          >
            {languages.map((language) => (
              <Option key={language.code}>{language.name}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col span={24}>
          <TextArea
            showCount
            maxLength={500}
            style={{
              height: 120,
            }}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }} span={24}>
          <Button type="primary">Translate</Button>
        </Col>
      </Row>
    </>
  );
};
export default Translator;
