$(function () {
  const currentHour = dayjs().format('H');

  // Loop through each time block
  $('.time-block').each(function() {
    const timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass('past').removeClass('present future');
    } else if (timeBlockHour == currentHour) {
      $(this).addClass('present').removeClass('past future');
    } else {
      $(this).addClass('future').removeClass('past present');
    }

    // Get user input saved in localStorage and set textarea values
    const savedInput = localStorage.getItem($(this).attr('id'));
    if (savedInput) {
      $(this).find('textarea').val(savedInput);
    }
  });

  // Save user input to localStorage when the save button is clicked
  $('.saveBtn').on('click', function() {
    const textArea = $(this).siblings('textarea');
    const timeBlockId = $(this).parent().attr('id');
    const userInput = textArea.val().trim();

    if (userInput !== '') {
      localStorage.setItem(timeBlockId, userInput);
    }
  });

  // Display the current date in the header
  const currentDayElement = $('#currentDay');
  currentDayElement.text(dayjs().format('MMMM DD, YYYY'));
});