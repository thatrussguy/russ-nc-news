const { expect } = require("chai");
const {
  formatDates,
  renameKey,
  createRef,
  formatData,
  formatComments
} = require("../utils/data-formatting");

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
  describe("createRef()", () => {
    it("returns an empty object, when passed an empty array", () => {
      const input = [];
      const actual = createRef(input);
      const expected = {};
      expect(actual).to.eql(expected);
    });
    it("returns an object with one key: value entry, when passed an array with one entry", () => {
      const input = [
        { name: "vel", phoneNumber: 01134445566, address: "Northcoders, Leeds" }
      ];
      let actual = createRef(input, "name", "phoneNumber");
      let expected = { vel: 01134445566 };
      expect(actual).to.eql(expected);
      actual = createRef(input, "name", "address");
      expected = { vel: "Northcoders, Leeds" };
      expect(actual).to.eql(expected);
    });
    it("returns an object with all key: value entries, when passed an array with many entries", () => {
      const input = [
        {
          name: "vel",
          phoneNumber: 01134445566,
          address: "Northcoders, Leeds"
        },
        {
          name: "ant",
          phoneNumber: 01612223344,
          address: "Northcoders, Manchester"
        },
        { name: "mitch", phoneNumber: 07777777777, address: null }
      ];
      let actual = createRef(input, "name", "phoneNumber");
      let expected = { vel: 01134445566, ant: 01612223344, mitch: 07777777777 };
      expect(actual).to.eql(expected);
      actual = createRef(input, "name", "address");
      expected = {
        vel: "Northcoders, Leeds",
        ant: "Northcoders, Manchester",
        mitch: null
      };
      expect(actual).to.eql(expected);
    });
    it("does not mutate the input array", () => {
      const input = [
        {
          name: "vel",
          phoneNumber: 01134445566,
          address: "Northcoders, Leeds"
        },
        {
          name: "ant",
          phoneNumber: 01612223344,
          address: "Northcoders, Manchester"
        },
        { name: "mitch", phoneNumber: 07777777777, address: null }
      ];
      const copy = [
        {
          name: "vel",
          phoneNumber: 01134445566,
          address: "Northcoders, Leeds"
        },
        {
          name: "ant",
          phoneNumber: 01612223344,
          address: "Northcoders, Manchester"
        },
        { name: "mitch", phoneNumber: 07777777777, address: null }
      ];
      let actual = createRef(input, "name", "phoneNumber");
      let expected = { vel: 01134445566, ant: 01612223344, mitch: 07777777777 };
      expect(actual).to.eql(expected);
      actual = createRef(input, "name", "address");
      expected = {
        vel: "Northcoders, Leeds",
        ant: "Northcoders, Manchester",
        mitch: null
      };
      expect(actual).to.eql(expected);
      expect(input).to.deep.equal(copy);
    });
  });
  describe("formatData()", () => {
    it("formats an array of objects by renaming and replacing a key with the corresponding data in a reference object", () => {
      const data = [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ];
      const expected = [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          article_id: 18,
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ];
      const refObj = {
        "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18
      };
      const actual = formatData(data, refObj, "belongs_to", "article_id");
      expect(actual).to.deep.equal(expected);
    });
    it("doesn't mutate the original array", () => {
      const data = [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ];
      const copyOfData = [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ];
      const expected = [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          article_id: 18,
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ];
      const refObj = {
        "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18
      };
      const actual = formatData(data, refObj, "belongs_to", "article_id");
      expect(actual).to.deep.equal(expected);
      expect(data).to.deep.equal(copyOfData);
    });
  });
  describe("formatComments()", () => {
    it("renames created_by to author", () => {
      const data = [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ];
      const actual = formatComments(data);
      expect(actual[0].author).to.equal(data[0].created_by);
    });
    it("renames belongs_to to article_id and replaces the value with the matching article id", () => {
      const data = [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ];
      const refObj = {
        "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18
      };
      const actual = formatComments(data, refObj, "created_by", "author");
      expect(actual[0].article_id).to.equal(18);
    });
  });
});
