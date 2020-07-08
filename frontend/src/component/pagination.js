import React, { Component } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styled, { css } from "styled-components";

export default class TodoApp extends Component {
  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  render() {
    return (
      <div>
        <div
          id="divToPrint"
          className="mt4"
          {...css({
            backgroundColor: "#f5f5f5",
            width: "210mm",
            minHeight: "297mm",
            marginLeft: "auto",
            marginRight: "auto"
          })}
          style={{
            height: "297mm",
            width: "180mm",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <h1>heyyyyyyyyyyy</h1>
        </div>
        <div>
          <button className="camaign" onClick={this.printDocument}>
            {" "}
            Download Report
          </button>
        </div>
      </div>
    );
  }
}

// import React, { Component } from "react";

// export default class TodoApp extends Component {
//   state = {
//     todos: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
//     currentPage: 1,
//     todosPerPage: 3
//   };

//   handleClick = event => {
//     this.setState({
//       currentPage: Number(event.target.id)
//     });
//   };

//   render() {
//     const { todos, currentPage, todosPerPage } = this.state;

//     // Logic for displaying todos
//     const indexOfLastTodo = currentPage * todosPerPage;
//     const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//     const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

//     const renderTodos = currentTodos.map((todo, index) => {
//       return <li key={index}>{todo}</li>;
//     });

//     // Logic for displaying page numbers
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
//       pageNumbers.push(i);
//     }

//     const renderPageNumbers = pageNumbers.map(number => {
//       return (
//         <li key={number} id={number} onClick={this.handleClick}>
//           {number}
//         </li>
//       );
//     });

//     return (
//       <div>
//         <ul>{renderTodos}</ul>
//         <ul id="page-numbers">{renderPageNumbers}</ul>
//       </div>
//     );
//   }
// }

// // ReactDOM.render(<TodoApp />, document.getElementById("app"));

// // componentDidMount() {

// //   // for getting signature

// //   var http = require("http"),
// //     crypto = require("crypto");

// //   var options = {
// //     host: "api.sec.neustar.biz",
// //     path: "/performance",
// //     port: 80
// //   };

// //   var service = "/monitor";
// //   var version = "/1.0";
// //   var method = "/locations";

// //   var apikey = "220.1.5ec7bf24e4b0887ff43a67e5.v64BxWSoT";
// //   var secret = "X4VpuDpW";

// //   var currTimeStamp = Math.round(new Date().getTime() / 1000);
// //   var sig = crypto
// //     .createHash("md5")
// //     .update(apikey + secret + currTimeStamp)
// //     .digest("hex");

// //   options.path +=
// //     service + version + method + "?apikey=" + apikey + "&sig=" + sig;

// //   var response = "";
// //   var req = http.get(options, function(res) {
// //     console.log("signature", sig);
// //     res.on("data", function(chunk) {
// //       response += chunk;
// //     });
// //     res.on("end", function() {
// //       if (res.statusCode !== 200) {
// //         console.log(
// //           "Request failed: HTTP status response = " + res.statusCode
// //         );
// //       }
// //       console.log(response);
// //     });
// //   });
// // }
