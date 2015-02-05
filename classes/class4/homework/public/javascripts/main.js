var loadThings = function () {
$('form.toggleIngredient').unbind();
$('form#newIngredient').unbind();
$('input.edit').unbind();
$('input.pickIngredient').unbind();
$('form.order').unbind();

// Toggling Ingredients
$('form.toggleIngredient').submit(function (event) {
    event.preventDefault();

    var $form = $(event.target).closest('form');
    var current = $form.find('input[class="toggle"]');

    if (current.val() == "In Stock") {
        current.val("Out of Stock");
        $.post('/toggleIngredient', {
              id: $form.attr('id')
            , stock: false
        });
    } else {
        current.val("In Stock");
        $.post('/toggleIngredient', {
              id: $form.attr('id')
            , stock: true
        });
    }
});

// Add Ingredient
$('form#newIngredient').submit(function (event) {
    event.preventDefault();
    $form = $(event.target);
    var name = $form.find('input[name="name"]')
    var cost = $form.find('input[name="cost"]')

    if (isNaN(cost.val())) {
        alert("Cost must be numerical");
        return;
    }

    $.post('/newIngredient', {
          name: name.val()
        , cost: cost.val()
    }).done(function (data) {
        $ing = $("form.toggleIngredient").clone().first();
        if ($ing.length != 0) {
            $ing.attr('id', data._id);
            $ing.find('span').html(data.name + ": $" + data.cost);
            $ing.find('input.toggle').val("In Stock");
            $("div#list").append($ing);
        } else {
            console.log("Here");
            $("div#list").append('<form id=' + data._id + 'class="toggleIngredient" action="toggleIngredient" method="POST">'
                + '<span>' + data.name + ": $" + data.cost + "</span>" +
                '<input type="button" class="edit" value="Edit">' + 
                '<input type="submit" value="In Stock" class="toggle">' +
                '</form>');
        }


        name.val("");
        cost.val("");

        loadThings();
    });
});

// Edit Ingredients
$('input.edit').click(function (event) {
    event.preventDefault();

    var $form = $(event.target).closest('form');
    var name = prompt("Change Ingredient name");
    var cost = prompt("Change Ingredient cost");
    $form.find('span').html(name + ": $" + cost);
    $.post('/editIngredient', {
          id: $form.attr('id')
        , name: name
        , cost: cost
    });
});

// Choose Ingredients
$('input.pickIngredient').change(function (event) {
    var $target = $(event.target);
    $form = $target.closest('form');

    var $input_cost = $form.find('input[name="totalCost"]');
    var $text_ing = $form.find('textarea[id="ingredients"]');
    var cost = parseFloat($target.attr('id'));

    if ($target.is(":checked")) {
        if (cost) {
            $input_cost.val(parseFloat($input_cost.val()) + cost);
            $text_ing.val($text_ing.val() + " " + $target.attr('value'));
        } 
    } else {
        $input_cost.val($input_cost.val() - cost);
        $text_ing.val($text_ing.val().replace(" " + $target.attr('value'), ""));
    }
});

// Finish Order
$('form.order').submit(function (event) {
    event.preventDefault();
    var $target = $(event.target);
    $form = $target.closest('form');
    $target.remove();
    $.post('/doneOrder', {id: $form.attr('id')}); 
});
};

loadThings();

