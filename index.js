//collect the input fields selected

let submit = document.getElementById("generate-password-id");

function check_password_strength(array, min_length) {
  let true_values = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i]) true_values++;
  }

  if (true_values == 1) {
    return 33;
  } else if (true_values > 2 && min_length > 12) {
    return 100;
  }

  return 66;
}

function generatePassword(
  password_characters,
  exclude_duplicates,
  include_spaces,
  password_characters_length
) {
  let password = "";
  let min_length = document.getElementById("length-slider").value;

  if (exclude_duplicates && min_length > password_characters_length) {
    alert(
      "Please select more filters for exclude duplicate filter to be selected."
    );
    return "";
  }

  for (let i = 0; i < min_length; i++) {
    let index;
    if ((i == 0 || i == min_length - 1) && include_spaces) {
      index = Math.floor(Math.random() * (password_characters_length - 10));
    } else {
      index = Math.floor(Math.random() * password_characters_length);
    }
    password += password_characters[index];

    if (exclude_duplicates) {
      if (password_characters[index] != undefined) {
        password_characters =
          password_characters.slice(0, index) +
          password_characters.slice(index + 1);
        password_characters_length -= 1;
      } else {
        alert("Some error occured");
      }
    }
  }

  return password;
}

submit.addEventListener("click", () => {
  //get the list of selected filters

  let password_characters = "";
  let password_characters_length = 0;

  let lowercase = document.getElementById("lowercase-select").checked;
  let uppercase = document.getElementById("uppercase-select").checked;
  let numbers = document.getElementById("numbers-select").checked;
  let symbols = document.getElementById("symbols-select").checked;
  let exclude_duplicates = document.getElementById(
    "exclude-duplicates-select"
  ).checked;
  let include_spaces = document.getElementById("include-spaces-select").checked;

  if (lowercase) {
    password_characters += "abcdefghijklmnopqrstuvwxyz";
    password_characters_length += 26;
  }
  if (uppercase) {
    password_characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    password_characters_length += 26;
  }
  if (numbers) {
    password_characters += "0123456789";
    password_characters_length += 10;
  }
  if (symbols) {
    password_characters += "!-$^+";
    password_characters_length += 5;
  }
  if (include_spaces) {
    password_characters += "          ";
    password_characters_length += 10;
  }

  if (!lowercase && !uppercase && !numbers && !symbols) {
    alert("Please select atleast one of the main filter");
    return;
  }

  let min_length = document.getElementById("length-slider").value;

  let password = generatePassword(
    password_characters,
    exclude_duplicates,
    include_spaces,
    password_characters_length
  );

  let width = check_password_strength(
    [
      lowercase,
      uppercase,
      numbers,
      symbols,
      exclude_duplicates,
      include_spaces,
    ],
    min_length
  );

  document.getElementById("input-password-id").value = password;
  document.getElementById("color-bar-id").style.width = width + "%";

  if (password != "") {
    if (width == 33) {
      document.getElementById("color-bar-id").style.backgroundColor = "#B22222";
      document.getElementById("password-text-strength").textContent = "Poor";
      document.getElementById("password-text-strength").style.color = "#B22222";
    } else if (width == 66) {
      document.getElementById("color-bar-id").style.backgroundColor = "#FFA500";
      document.getElementById("password-text-strength").textContent = "Medium";
      document.getElementById("password-text-strength").style.color = "#FFA500";
    } else {
      document.getElementById("color-bar-id").style.backgroundColor = "#006400";
      document.getElementById("password-text-strength").textContent = "Strong";
      document.getElementById("password-text-strength").style.color = "#006400";
    }
    document.querySelector(".password-strength-status").style.visibility =
      "visible";
  }
});

let length_slider = document.getElementById("length-slider");

length_slider.addEventListener("change", () => {
  document.getElementById("slider-number").textContent = length_slider.value;
});
