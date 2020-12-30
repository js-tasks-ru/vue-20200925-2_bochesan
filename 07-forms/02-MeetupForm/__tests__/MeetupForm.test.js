const { getSolutionPath } = require('taskbook-test-utils');
const MeetupForm = require(getSolutionPath('components/MeetupForm')).default;
import { shallowMount } from '@vue/test-utils';
import ImageUploader from '../components/ImageUploader';
import MeetupAgendaItemForm from '../components/MeetupAgendaItemForm';

describe('forms/MeetupForm', () => {
  describe('MeetupForm', () => {
    let wrapper;
    const submitText = 'Submit-Test-Text';

    const meetup = {
      id: 0,
      title: 'TheTitle',
      description: 'Short Description',
      imageId: 42,
      date: '2020-02-01',
      place: 'Test Place',
      agenda: [
        {
          id: 0,
          startsAt: '05:00',
          endsAt: '10:00',
          type: 'registration',
          title: null,
          description: null,
          speaker: null,
          language: null,
        },
        {
          id: 1,
          startsAt: '10:00',
          endsAt: '11:00',
          type: 'opening',
          title: null,
          description: null,
          speaker: null,
          language: null,
        },
        {
          id: 2,
          startsAt: '11:00',
          endsAt: '12:00',
          type: 'other',
          title: 'Title',
          description: 'Description',
          speaker: null,
          language: null,
        },
      ],
    };

    beforeEach(() => {
      wrapper = shallowMount(MeetupForm, {
        propsData: {
          meetup,
          submitText,
        },
      });
    });

    it('MeetupForm должен иметь обязательный параметр объект meetup и строку submitText', () => {
      expect(wrapper.vm.$options.props.meetup).toBeTruthy();
      expect(wrapper.vm.$options.props.meetup.type).toBe(Object);
      expect(wrapper.vm.$options.props.meetup.required).toBeTruthy();
      expect(wrapper.vm.$options.props.submitText).toBeTruthy();
      expect(wrapper.vm.$options.props.submitText.type).toBe(String);
    });

    it('MeetupForm должен выводить кнопку сабмита с текстом из параметра submitText', () => {
      expect(wrapper.find('[data-test=submit]').text()).toBe(submitText);
    });

    it('MeetupForm должен выводить поля митапа с корректными значениями по умолчанию', () => {
      const inputs = wrapper
        .findAll('input, textarea')
        .wrappers.map((wrapper) => wrapper.element);
      expect(inputs).toHaveLength(4);
      expect(inputs[0].value).toBe(meetup.title);
      expect(inputs[1].value).toBe(meetup.date);
      expect(inputs[2].value).toBe(meetup.place);
      expect(inputs[3].value).toBe(meetup.description);
      expect(wrapper.findComponent(ImageUploader).props('value')).toBe(
        meetup.imageId,
      );
    });

    it('MeetupForm должен порождать событие cancel при клике на кнопку отмены', async () => {
      await wrapper.find('[data-test=cancel]').trigger('click');
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });

    it('MeetupForm должен выводить формы редактирования пунктов программы митапа', async () => {
      const agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(agendaItemForms).toHaveLength(meetup.agenda.length);
      meetup.agenda.forEach((agendaItem, index) => {
        expect(agendaItemForms.at(index).props('agendaItem')).toEqual(
          agendaItem,
        );
      });
    });

    it('MeetupForm должен добавлять этап программы в конец программы по клику на кнопку "Добавить этап программы"', async () => {
      await wrapper.find('[data-test=addAgendaItem').trigger('click');
      const agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(agendaItemForms).toHaveLength(meetup.agenda.length + 1);
      meetup.agenda.forEach((agendaItem, index) => {
        expect(agendaItemForms.at(index).props('agendaItem')).toEqual(
          agendaItem,
        );
      });
    });

    it('MeetupForm должен добавлять новый этап программы с временем начала, равным времени окончания последнего этапа', async () => {
      await wrapper.find('[data-test=addAgendaItem').trigger('click');
      const agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(
        agendaItemForms.at(agendaItemForms.length - 1).props('agendaItem')
          .startsAt,
      ).toBe(meetup.agenda[meetup.agenda.length - 1].endsAt);
    });

    it('MeetupForm должен удалять этап программы по событию remove из MeetupAgendaItemForm', async () => {
      let agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      agendaItemForms.at(1).vm.$emit('remove');
      await wrapper.vm.$nextTick();
      agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(agendaItemForms).toHaveLength(meetup.agenda.length - 1);
      expect(agendaItemForms.at(0).props('agendaItem')).toEqual(meetup.agenda[0]);
      expect(agendaItemForms.at(1).props('agendaItem')).toEqual(meetup.agenda[2]);
    });

    it('MeetupForm должен порождать событие submit по сабмиту формы с новыми данными митапа', async () => {
      const newMeetup = {
        ...meetup,
        title: 'NewTitle',
        description: 'New Short Description',
        imageId: 43,
        date: '2021-03-02',
        place: 'New Testing Place',
      };
      const inputs = wrapper.findAll('input, textarea').wrappers;
      await inputs[0].setValue(newMeetup.title);
      await inputs[1].setValue(newMeetup.date);
      await inputs[2].setValue(newMeetup.place);
      await inputs[3].setValue(newMeetup.description);
      await wrapper
        .findComponent(ImageUploader)
        .vm.$emit('change', newMeetup.imageId);
      await wrapper.find('form').trigger('submit');
      expect(wrapper.emitted('submit')).toBeTruthy();
      expect(wrapper.emitted('submit')[0]).toEqual([newMeetup]);
    });

    it('MeetupForm должен порождать событие submit по сабмиту формы с новыми данными программы митапа', async () => {
      const newAgendaItem = {
        id: 5,
        startsAt: '14:00',
        endsAt: '15:00',
        type: 'talk',
        title: 'Title',
        description: 'Description',
        speaker: null,
        language: null,
      };

      let agendaItem = wrapper.findComponent(MeetupAgendaItemForm);
      do {
        agendaItem.vm.$emit('remove');
        await wrapper.vm.$nextTick();
        agendaItem = wrapper.findComponent(MeetupAgendaItemForm);
      } while (agendaItem.exists());

      await wrapper.find('[data-test=addAgendaItem').trigger('click');
      await wrapper
        .findComponent(MeetupAgendaItemForm)
        .vm.$emit('update:agendaItem', newAgendaItem);
      await wrapper.vm.$nextTick();
      await wrapper.find('form').trigger('submit');
      expect(wrapper.emitted('submit')).toBeTruthy();
      expect(wrapper.emitted('submit')[0][0].agenda).toEqual([newAgendaItem]);
    });
  });
});
