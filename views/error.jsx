var React = require("react");
var DefaultLayout = require("./layouts/default");

function Error(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>
        <h1>{props.message}</h1>
        <h2>{props.error.status}</h2>
        <pre>{props.error.stack}</pre>
      </div>
    </DefaultLayout>
  );
}

module.exports = Error;
