const { getSolutionPath } = require('taskbook-test-utils');
const MeetupAgendaItemForm = require(getSolutionPath(
  'components/MeetupAgendaItemForm',
)).default;
import { mount } from '@vue/test-utils';

describe('forms/GeneratedForm', () => {
  describe('GeneratedForm', () => {
    let wrapper;
    const agendaItem = {
      id: 0,
      startsAt: '05:00',
      endsAt: '10:00',
      type: 'other',
      title: 'Title',
      description: 'Description',
      speaker: null,
      language: null,
    };

    beforeEach(() => {
      wrapper = mount(MeetupAgendaItemForm, {
        propsData: {
          agendaItem,
        },
      });
    });

    it('MeetupAgendaItemForm должен иметь обязательный параметр agendaItem', () => {
      expect(wrapper.vm.$options.props.agendaItem).toBeTruthy();
      expect(wrapper.vm.$options.props.agendaItem.type).toBe(Object);
      expect(wrapper.vm.$options.props.agendaItem.required).toBeTruthy();
    });

    it('MeetupAgendaItemForm должен выводить поля доклада с корректными значениями по умолчанию', () => {
      const inputs = wrapper
        .findAll('input, select, textarea')
        .wrappers.map((wrapper) => wrapper.element);
      expect(inputs).toHaveLength(5);
      expect(inputs[0].value).toBe(agendaItem.type);
      expect(inputs[1].value).toBe(agendaItem.startsAt);
      expect(inputs[2].value).toBe(agendaItem.endsAt);
      expect(inputs[3].value).toBe(agendaItem.title);
      expect(inputs[4].value).toBe(agendaItem.description);
    });

    it('MeetupAgendaItemForm должен порождать событие remove при клике на кнопку удаления', async () => {
      await wrapper.find('.remove-button').trigger('click');
      expect(wrapper.emitted('remove')).toHaveLength(1);
    });

    it('MeetupAgendaItemForm должен выводить все поля для типа other', async () => {
      const inputs = wrapper.findAll('.form-group').wrappers;
      expect(inputs).toHaveLength(5);
      expect(inputs[3].find('label').text()).toBe('Заголовок');
      expect(inputs[3].find('input').exists());
      expect(inputs[4].find('label').text()).toBe('Описание');
      expect(inputs[4].find('textarea').exists());
    });

    it('MeetupAgendaItemForm должен выводить все поля для типа talk', async () => {
      await wrapper.find('select').setValue('talk');
      const inputs = wrapper.findAll('.form-group').wrappers;
      expect(inputs).toHaveLength(7);
      expect(inputs[3].find('label').text()).toBe('Тема');
      expect(inputs[3].find('input').exists());
      expect(inputs[4].find('label').text()).toBe('Докладчик');
      expect(inputs[4].find('input').exists());
      expect(inputs[5].find('label').text()).toBe('Описание');
      expect(inputs[5].find('textarea').exists());
      expect(inputs[6].find('label').text()).toBe('Язык');
      expect(inputs[6].find('select').exists());
    });

    it.each([
      'registration',
      'opening',
      'break',
      'coffee',
      'closing',
      'afterparty',
    ])(
      'MeetupAgendaItemForm должен выводить все поля для типа %s',
      async (type) => {
        await wrapper.find('select').setValue(type);
        const inputs = wrapper.findAll('.form-group').wrappers;
        expect(inputs).toHaveLength(4);
        expect(inputs[3].find('label').text()).toBe(
          'Нестандартный текст (необязательно)',
        );
        expect(inputs[3].find('input').exists());
      },
    );

    it('MeetupAgendaItemForm должен синхронизировать параметр agendaItem после изменения значения в форме доклада', async () => {
      await wrapper.find('select').setValue('talk');
      const inputs = wrapper.findAll('input, select, textarea').wrappers;
      expect(inputs).toHaveLength(7);
      const newAgendaItem = {
        id: 0,
        startsAt: '04:00',
        endsAt: '06:00',
        type: 'talk',
        title: 'NewTitle',
        description: 'NewDescription',
        speaker: 'NewSpeaker',
        language: 'EN',
      };
      await inputs[1].setValue(newAgendaItem.startsAt);
      await inputs[2].setValue(newAgendaItem.endsAt);
      await inputs[3].setValue(newAgendaItem.title);
      await inputs[4].setValue(newAgendaItem.speaker);
      await inputs[5].setValue(newAgendaItem.description);
      await inputs[6].setValue(newAgendaItem.language);
      const lastEmitted = wrapper.emitted('update:agendaItem')[
        wrapper.emitted('update:agendaItem').length - 1
      ];
      expect(lastEmitted).toHaveLength(1);
      expect(lastEmitted[0]).toEqual(newAgendaItem);
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 10:00 до 11:00 при увеличении времени начала с 05:00 до 06:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input').wrappers;
      await startsAt.setValue('06:00');
      expect(endsAt.element.value).toBe('11:00');
    });

    it('MeetupAgendaItemForm должен уменьшать время окончания с 10:00 до 09:00 при уменьшении времени начала с 05:00 до 04:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input').wrappers;
      await startsAt.setValue('04:00');
      expect(endsAt.element.value).toBe('09:00');
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 10:00 до 03:00 при увеличении времени начала с 05:00 до 22:00 при переходе через полночь', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input').wrappers;
      await startsAt.setValue('22:00');
      expect(endsAt.element.value).toBe('03:00');
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 11:00 до 12:00 при увеличении времени начала с 05:00 до 06:00 после установки времени окончания в 11:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input').wrappers;
      await endsAt.setValue('11:00');
      await startsAt.setValue('06:00');
      expect(endsAt.element.value).toBe('12:00');
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 02:00 до 03:00 при увеличении времени начала с 05:00 до 06:00 после установки времени окончания в 02:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input').wrappers;
      await endsAt.setValue('02:00');
      await startsAt.setValue('06:00');
      expect(endsAt.element.value).toBe('03:00');
    });
  });
});
