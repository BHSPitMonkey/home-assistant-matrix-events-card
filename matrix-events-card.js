class MatrixEventsCard extends HTMLElement {
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card style="background: rgb(0, 10, 0); height: 100%; width: 100%; overflow: hidden;">
          <style>
          .matrix-log-card-line {
            position: absolute;
            color: rgba(100, 240, 100, 0.8);
            writing-mode: vertical-rl;
            text-orientation: upright;
            font-size: 300%;
            font-family: monospace;
          }
          </style>
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");

      this.lines = [];
      this.maxLines = 100;
      this.nextLine = 0;
      for (let i = 0; i < this.maxLines; i++) {
        this.lines[i] = document.createElement("p");
        this.lines[i].classList.add("matrix-log-card-line");
        this.content.appendChild(this.lines[i]);
      }

      // Start listening
      hass.connection.subscribeEvents(this.eventReceived.bind(this));
    }
  }

  eventReceived(event) {
    const entity = event?.data?.entity_id;
    const state = event?.data?.new_state?.state;
    let text = "";
    if (entity) {
      text = `${entity} ↓ ${state}`;
      console.log(text);
    } else if (event?.event_type == "device_registry_updated") {
      text = `${event?.data?.device_id} ↓ ${event?.data?.action}`;
      console.log(text);
    } else if (event?.event_type == "call_service") {
      text = `${event?.data?.domain}.${event?.data?.service} ↓ ${event?.data?.service_data?.entity_id}`;
      console.log(text);
    } else {
      console.log(event);
    }

    if (text != "") {
      const left = Math.random() * 100;
      const top = Math.random() * 100 - 40;
      const size = 100 + Math.random() * 100;
      this.lines[this.nextLine].innerText = text;
      this.lines[this.nextLine].style =
        `left: ${left}%; top: ${top}%; font-size: ${size}%`;
      this.nextLine = (this.nextLine + 1) % this.maxLines;
    }
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  setConfig(config) {
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns in masonry view
  getCardSize() {
    return 3;
  }

  // The rules for sizing your card in the grid in sections view
  getLayoutOptions() {
    return {
      grid_rows: 3,
      grid_columns: 2,
      grid_min_rows: 2,
      grid_max_rows: 2,
    };
  }
}

customElements.define("matrix-events-card", MatrixEventsCard);

