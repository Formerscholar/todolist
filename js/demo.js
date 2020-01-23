$(function () {


    load();


    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {

            if ($(this).val() !== "") {
                var local = getDate();

                local.push({
                    title: $(this).val(),
                    done: false
                });


                saveDate(local);

                load();
                $(this).val("");
            }
        }
    });
    // 删除操作
    $("ol,ul").on("click", "a", function () {

        var date = getDate();

        var index = $(this).attr("id");
        date.splice(index, 1);

        saveDate(date);

        load();
    });

    // 正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function () {

        var date = getDate();

        var index = $(this).siblings("a").attr("id");
        date[index].done = $(this).prop("checked");

        saveDate(date);

        load();
    });


    //读取本地存储数据
    function getDate() {
        var date = localStorage.getItem('todolist');
        if (date !== null) {
            return JSON.parse(date);
        } else {
            return [];
        }
    };


    // 保存本地存储数据
    function saveDate(params) {
        localStorage.setItem("todolist", JSON.stringify(params));
    };

    // 渲染本地数据到页面
    function load() {
        var date = getDate();
        $("ol,ul").empty();
        var todocount = 0;
        var donecount = 0;
        $.each(date, function (i, n) {

            if (n.done) {
                $("ul").prepend("<li><input type = 'checkbox' checked='checked'> <p >" + n.title + "</p> <a href = 'javascript:;' id=" + i + "></a></li>");
                donecount++;
            } else {
                $("ol").prepend("<li><input type = 'checkbox' > <p >" + n.title + "</p> <a href = 'javascript:;' id=" + i + "></a></li>");
                todocount++;
            }

        });
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
    };




})