const { expect } = require("chai");
const { formatDates } = require("../utils/data-formatting");

describe("Data formatting helpers", () => {
  describe("formatDates()", () => {
    it("reformats dates", () => {
      const data = [
        {
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: 1471522072389
        }
      ];
      const expected = [
        {
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: new Date(1471522072389)
        }
      ];
      const actual = formatDates(data);
      expect(expected).to.deep.equal(actual);
      expect(expected[0].created_at.toString()).to.equal(
        "Thu Aug 18 2016 13:07:52 GMT+0100 (British Summer Time)"
      );
    });
    it("doesn't mutate the original array", () => {
      const data = [
        {
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: 1471522072389
        }
      ];
      const copyOfData = [
        {
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: 1471522072389
        }
      ];
      const expected = [
        {
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: new Date(1471522072389)
        }
      ];
      const actual = formatDates(data);
      expect(expected).to.deep.equal(actual);
      expect(data).to.deep.equal(copyOfData);
    });
  });
});
