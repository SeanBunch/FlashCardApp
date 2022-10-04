import React from "react";

function Form({frontHandler, backHandler, card={}}) {

function front() {
    return card.front ? card.front : "";
}

function back() {
    return card.back ? card.back : ""; 
}

    return(
        <div>
      <form>
        <div>
          <label>Front</label>
          <textarea
            id="front"
            type="textarea"
            name="front"
            value={front()}
            onChange={frontHandler}
            placeholder="Front side of card"
            style={{ width: "100%" }}
          />
        </div>
        <br />
        <div>
          <label>Back</label>
          <textarea
            id="back"
            type="textarea"
            name="back"
            value={back()}
            onChange={backHandler}
            placeholder="Back side of card"
            style={{ width: "100%" }}
          />
        </div>
        </form>
    </div>
    )
}

export default Form;