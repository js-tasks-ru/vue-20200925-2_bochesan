export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" src="/assets/icons/icon-cal-sm.svg" />
      </div>
      <div class="meetup-agenda__item-col">00:00 - 00:00</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">Заголовок</h5>
        <p>
          <span>Докладчик</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">ru</span>
        </p>
        <p>Описание</p>
      </div>
    </div>`,

  // props

  // Возможно, тут потребуется computed
};
