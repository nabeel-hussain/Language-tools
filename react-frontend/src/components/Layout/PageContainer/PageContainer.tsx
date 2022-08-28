import { PageHeader, Divider, Row, Col } from "antd";

export interface Props {
  children?: React.ReactNode;
  title?: React.ReactNode;
  hideDivider?: boolean;
}
const PageContainer = (props: Props) => {
  return (
    <Row className="main-container">
      <Col span={24}>
        <Row style={{ backgroundColor: "#F0F2F5" }}>
          <Col span={24}>
            <PageHeader
              backIcon={false}
              className="site-page-header"
              onBack={() => null}
              title={props.title}
            ></PageHeader>
          </Col>
        </Row>
        <Row>
          <Col
            span={23}
            className="page-cont"
            style={{ backgroundColor: "white" }}
          >
            {props.children}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default PageContainer;
