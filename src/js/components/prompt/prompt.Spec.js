
var constants = require('../../../config/constants.js');
var promptComponent = require('./promptComponent.js');

Vue.config.silent = true;

describe('The prompt component', function () {
  var component;

  beforeEach(function () {
    component = _.extend(promptComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('data', function () {
    var data;

    beforeEach(function () {
      data = component.data();
    });

    it('should set promptValue to an empty string', function () {
      expect(data.promptValue).toEqual('');
    });

    it('should set show to false', function () {
      expect(data.show).toEqual(false);
    });

    it('should set confirmed to false', function () {
      expect(data.confirmed).toEqual(false);
    });

    it('should have an ask function to handle requests', function () {
      expect(typeof data.ask).toEqual('function');
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#yes', function () {
      it('should set confirmed to true', function () {
        componentInstance.yes();
        expect(componentInstance.confirmed).toEqual(true);
      });
    });

    describe('#no', function () {
      it('should set confirmed to false', function () {
        componentInstance.confirmed = true;
        componentInstance.no();
        expect(componentInstance.confirmed).toEqual(false);
      });
    });

    describe('#ask', function () {
      var askData, yesSpy, noSpy;

      beforeEach(function () {
        askData = {
          question: 'test question',
          yesLabel: 'yessir',
          noLabel: 'nosir'
        };

        componentInstance.ask(askData);
      });

      it('should set labels', function () {
        expect(componentInstance.questionLabel).toEqual('test question');
        expect(componentInstance.yesLabel).toEqual('yessir');
        expect(componentInstance.noLabel).toEqual('nosir');
      });

      it('should show the prompt', function () {
        expect(componentInstance.show).toEqual(true);
      });

      it('should set confirmed to undefined', function () {
        expect(componentInstance.confirmed).toEqual(undefined);
      });

      it('should call the yes function and hide the prompt when confirmed it set to true', function () {
        yesSpy = jasmine.createSpy('yes');
        askData.yes = yesSpy;
        componentInstance.promptValue = 'test value';
        componentInstance.confirmed = true;
        Vue.nextTick(function () {
          expect(componentInstance.show).toEqual(false);
          expect(yesSpy).toHaveBeenCalledWith('test value');
        });
      });

      it('should call the no function and hide the prompt when confirmed it set to false', function () {
        noSpy = jasmine.createSpy('no');
        askData.no = noSpy;
        componentInstance.confirmed = false;
        Vue.nextTick(function () {
          expect(componentInstance.show).toEqual(false);
          expect(noSpy).toHaveBeenCalled();
        });
      });

    });
  });

});
