const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const { MeetupInfo } = require(getSolutionPath('MeetupInfo'));
const { MeetupAgenda } = require(getSolutionPath('MeetupAgenda'));
const { MeetupAgendaItem } = require(getSolutionPath('MeetupAgendaItem'));
const { MeetupCover } = require(getSolutionPath('MeetupCover'));
const { MeetupDescription } = require(getSolutionPath('MeetupDescription'));
const { MeetupView } = require(getSolutionPath('MeetupView'));
const { MeetupPage } = require(getSolutionPath('MeetupPage'));
import { meetup } from './__fixtures__/meetup';
import { getMeetupCoverLink } from '../data';

describe('components/MeetupPageComponent', () => {
  describe('MeetupPage', () => {
    it('MeetupPage должен быть определён', () => {
      expect(MeetupPage).toBeDefined();
    });
  });

  describe('MeetupView', () => {
    it('MeetupView должен иметь обязательный параметр meetup с объектом митапа', () => {
      const wrapper = shallowMount(MeetupView, {
        propsData: { meetup },
      });
      expect(wrapper.vm.$options.props.meetup.type).toBe(Object);
      expect(wrapper.vm.$options.props.meetup.required).toBe(true);
    });

    it('MeetupView должен показывать изображение, описание, информацию и программу митапа соответствующими компонентами', () => {
      const wrapper = shallowMount(MeetupView, {
        propsData: { meetup },
      });
      expect(wrapper.findComponent(MeetupCover).exists()).toBeTruthy();
      expect(wrapper.findComponent(MeetupDescription).exists()).toBeTruthy();
      expect(wrapper.findComponent(MeetupInfo).exists()).toBeTruthy();
      expect(wrapper.findComponent(MeetupAgenda).exists()).toBeTruthy();
    });
  });

  describe('MeetupCover', () => {
    it('MeetupCover должен иметь необязательные строковые параметры link и title', () => {
      const wrapper = shallowMount(MeetupCover);
      expect(wrapper.vm.$options.props.link.type).toBe(String);
      expect(wrapper.vm.$options.props.link.required).toBeFalsy();
      expect(wrapper.vm.$options.props.title.type).toBe(String);
      expect(wrapper.vm.$options.props.title.required).toBeFalsy();
    });

    it('MeetupCover должен выводить изображение митапа', () => {
      const link = getMeetupCoverLink(meetup);
      const wrapper = shallowMount(MeetupCover, { propsData: { link } });
      expect(wrapper.find('.meetup-cover').attributes().style).toContain(link);
    });

    it('MeetupCover не должен удалять изображение по умолчанию в случае отсутствия ссылки на изображение', () => {
      const wrapper = shallowMount(MeetupCover);
      expect(wrapper.find('.meetup-cover').attributes().style).toBeFalsy();
    });

    it('MeetupCover должен выводить название митапа', () => {
      const { title } = meetup;
      const wrapper = shallowMount(MeetupCover, {
        propsData: { title },
      });

      expect(wrapper.find('.meetup-cover__title').text()).toEqual(title);
    });
  });

  describe('MeetupDescription', () => {
    it('MeetupDescription должен иметь необязательный строковый параметр description', () => {
      const wrapper = shallowMount(MeetupDescription);
      expect(wrapper.vm.$options.props.description.type).toBe(String);
      expect(wrapper.vm.$options.props.description.required).toBeFalsy();
    });

    it('MeetupDescription должен выводить описание митапа', () => {
      const wrapper = shallowMount(MeetupDescription, {
        propsData: { description: meetup.description },
      });
      expect(wrapper.text()).toBe(meetup.description);
    });
  });

  describe('MeetupInfo', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(MeetupInfo, {
        propsData: {
          organizer: meetup.organizer,
          place: meetup.place,
          date: new Date(meetup.date),
        },
      });
    });

    it('MeetupInfo должен иметь обязательные строковые параметры organizer, place и обязательный параметр с датой date', () => {
      expect(wrapper.vm.$options.props.organizer.type).toBe(String);
      expect(wrapper.vm.$options.props.organizer.required).toBeTruthy();
      expect(wrapper.vm.$options.props.place.type).toBe(String);
      expect(wrapper.vm.$options.props.place.required).toBeTruthy();
      expect(wrapper.vm.$options.props.date.type).toBe(Date);
      expect(wrapper.vm.$options.props.date.required).toBeTruthy();
    });

    it('MeetupInfo должен выводить краткое описание митапа', () => {
      expect(wrapper.find('.info-list li:nth-child(1)').text()).toBe(
        meetup.organizer,
      );
      expect(wrapper.find('.info-list li:nth-child(2)').text()).toBe(
        meetup.place,
      );
      expect(wrapper.find('.info-list li:nth-child(3)').text()).toBe(
        new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
    });
  });

  describe('MeetupAgenda', () => {
    it('MeetupAgenda должен иметь параметр массив agenda', () => {
      const wrapper = shallowMount(MeetupAgenda, {
        propsData: { agenda: meetup.agenda },
      });
      expect(wrapper.vm.$options.props.agenda.type).toBe(Array);
    });

    it('MeetupAgenda должен выводить программу через компоненты MeetupAgendaItem', () => {
      const wrapper = shallowMount(MeetupAgenda, {
        propsData: { agenda: meetup.agenda },
      });
      expect(wrapper.findAllComponents(MeetupAgendaItem)).toHaveLength(
        meetup.agenda.length,
      );
    });
  });

  describe('MeetupAgendaItem', () => {
    it('MeetupAgendaItem должен иметь обязательный параметр объект agendaItem', () => {
      const wrapper = shallowMount(MeetupAgendaItem, {
        propsData: { agendaItem: meetup.agenda[0] },
      });
      expect(wrapper.vm.$options.props.agendaItem.type).toBe(Object);
      expect(wrapper.vm.$options.props.agendaItem.required).toBeTruthy();
    });

    it('MeetupAgendaItem должен выводить время', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, {
        propsData: { agendaItem },
      });
      expect(
        wrapper
          .find('.meetup-agenda__item .meetup-agenda__item-col:nth-child(2)')
          .text(),
      ).toBe(`${agendaItem.startsAt} - ${agendaItem.endsAt}`);
    });

    it('MeetupAgendaItem должен выводить заголовок по умолчанию', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, {
        propsData: { agendaItem },
      });
      expect(wrapper.find('.meetup-agenda__title').text()).toBe('Регистрация');
    });

    it('MeetupAgendaItem должен выводить правильную иконку для регистрации', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, {
        propsData: { agendaItem },
      });
      expect(
        wrapper.find('.meetup-agenda__item-col img').attributes().src,
      ).toContain('key');
    });

    it('MeetupAgendaItem должен выводить доклад', () => {
      const agendaItem = meetup.agenda[2];
      const wrapper = shallowMount(MeetupAgendaItem, {
        propsData: { agendaItem },
      });
      expect(
        wrapper.find('.meetup-agenda__item-col img').attributes().src,
      ).toContain('tv');
      expect(wrapper.find('.meetup-agenda__title').text()).toBe(
        agendaItem.title,
      );
      expect(
        wrapper
          .find('.meetup-agenda__item .meetup-agenda__item-col:nth-child(2)')
          .text(),
      ).toBe(`${agendaItem.startsAt} - ${agendaItem.endsAt}`);
      expect(wrapper.find('.meetup-agenda__lang').text()).toBe(
        agendaItem.language,
      );
      expect(wrapper.find('.meetup-agenda__item').text()).toContain(
        agendaItem.speaker,
      );
      expect(wrapper.find('.meetup-agenda__item').text()).toContain(
        agendaItem.description,
      );
    });
  });
});
