const { expect } = require("chai");
const { formatDates, renameKey } = require("../utils/data-formatting");

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
  describe("renameKey()", () => {
    it("renames the given key on an object", () => {
      const obj = {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      };
      const expected = {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        author: "tickle122",
        votes: -1,
        created_at: 1468087638932
      };
      const oldKey = "created_by";
      const newKey = "author";
      const actual = renameKey(obj, oldKey, newKey);
      expect(actual).to.deep.equal(expected);
    });
    it("doesn't mutate the original object", () => {
      const obj = {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      };
      const copyOfObj = {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      };
      const expected = {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        author: "tickle122",
        votes: -1,
        created_at: 1468087638932
      };
      const oldKey = "created_by";
      const newKey = "author";
      const actual = renameKey(obj, oldKey, newKey);
      expect(actual).to.deep.equal(expected);
      expect(obj).to.deep.equal(copyOfObj);
    });
  });
});
