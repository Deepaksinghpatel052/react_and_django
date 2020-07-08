// Camel Case Formatter
String.prototype.toCamelCase = function () {
  return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
};


const Switch = props => {
  const { className, label, noText } = props;
  let switchClass = className;
  let id = label.toCamelCase();

  props.large == true ? switchClass += ' switch--large' : null;
  props.noText == true ? switchClass += ' switch--no-text' : null;
  props.theme == 'success' ? switchClass += ' switch--success' : null;

  return (
    React.createElement("div", { "aria-label": label, className: switchClass },
    React.createElement("label", { className: "switch__label", htmlFor: id },
    React.createElement("input", { role: "switch", type: "checkbox", className: "switch__input", id: id }),
    React.createElement("span", { className: "switch__text", "data-on": "ON", "data-off": "OFF" }),
    React.createElement("span", { className: "switch__handle" }))));



};

Switch.propTypes = {
  className: React.PropTypes.string,
  theme: React.PropTypes.string,
  label: React.PropTypes.label,
  noText: React.PropTypes.boolean };


Switch.defaultProps = {
  className: 'switch',
  noText: false };


function SwitchToggle() {
  return (
    React.createElement("div", null,
    React.createElement(Switch, { label: "Switch One", large: true }),

    ));


}

ReactDOM.render(
React.createElement(App, null),
document.getElementById('SwitchToggle'));