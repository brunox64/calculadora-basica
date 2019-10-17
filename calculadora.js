/*
    Autor: Bruno Moreira Mota.
    Conteudo protegido por diretos autorais.
*/

function setN(e) { 
    $visor.addVal(this.value) 
}

function setOpk(e) { 
    e = e.toString(); 
    $visor.val(tratarParaEval($visor.val())); 
    if (!setOperacao(e)) { 
        return false 
    } 
    $visor.val(formatVirgula($visor.val())); 
    return true 
}

function setOperacao(e) { 
    e = e.toString(); 
    var t = /(\.)$/; 
    if (t.test($visor.val())) { 
        $visor.addVal("0") 
    } 
    var n = /^(((\+|-)?(\d+\.)?\d+)(\+|-|\*|\/)((\d+\.)?\d+))$/; 
    if (n.test($visor.val())) { 
        var r = !igual(); 
        if (r) { 
            return false 
        } 
        tratarVisor() 
    } 
    var i = /^((\+|-)?(\d+\.)?\d+(\+|-|\*|\/))$/; 
    var s = null; 
    if (i.test($visor.val())) { 
        var o = /(\+|-|\*|\/)$/; 
        if (o.test($visor.val())) { 
            if (e == o.exec($visor.val())[1]) { 
                return true 
            } else { 
                $visor.val($visor.val().replace(o, e)); 
                return true 
            } 
        } 
    } else if ((s = /^(\+|-|\*|\/)$/).test($visor.val())) { 
        var u = s.exec($visor.val())[1]; 
        if (u == e) { 
            return true 
        } else { 
            if ((u == "-" || u == "+") && (e == "/" || e == "*")) { 
                return true 
            } 
            $visor.val($visor.val().replace(s, e)); 
            return true 
        } 
    } else if ($visor.val() == "" && e != "-") { 
        return true 
    } else if (/^((\+|-)?(\d+\.)?\d+)$/.test($visor.val())) { 
        $visor.addVal(e); return true 
    } 
    return false 
}

function verificaDivisao(e) { 
    e = e.toString(); 
    var t = /(\/((\d+\.)?\d+))/; 
    if (t.test(e)) { 
        if (parseFloat(t.exec(e)[2]) == 0) { 
            alert("Impovivel divisão por zero encontrada"); 
            return false 
        } 
    } 
    return true 
}

function setOp(e) { 
    $visor.val(tratarParaEval($visor.val())); 
    var t = this.id; 
    if (t == "menos") { 
        if (!setOperacao("-")) { 
            e.preventDefault(); 
            return false 
        } 
    } else if (t == "vezes") { 
        if (!setOperacao("*")) { 
            e.preventDefault(); 
            return false 
        } 
    } else { 
        if (!setOperacao(this.value)) { 
            e.preventDefault(); 
            return false 
        } 
    } 
    $visor.val(formatVirgula($visor.val())); 
    return true 
}

function excluirResultado(e) {
    if ($(e.target).hasClass("btn-exclui")) { 
        var t = $(e.currentTarget);
        grid.remove(t) 
    } 
}

function TotalGrid() { 
    var e = 0; 
    var t = 0; 
    var n = $("#total"); 
    var r = $("#soma_total"); 
    this.add = function (n) { 
        e++; 
        n = parseFloat(parseFloat(n).toFixed(2)); 
        var r = t; 
        var s = formatVirgula(t.toString()); 
        var o = n; 
        var u = formatVirgula(n.toString()); 
        r = parseFloat((r + n).toFixed(2)); 
        s = formatVirgula(r.toString()); 
        atualizaTotal(r); 
        t = r; 
        var a = '<tr  class="row-exclui" value="@1">' + "<td>" + '<input name="despesas[]" title="Clique aqui para renomear o resultado." type="text" value="Resultado@2" class="input"></input>' + '<button type="button" class="bt btn-exclui">Excluir</button>' + "</td>" + "<td>" + "<label>@3</label>" + '<input type="hidden" name="valores[]" value="@4" class="input" />' + "</td>" + "</tr>"; 
        a = a.replace("@1", o); 
        a = a.replace("@4", o); 
        a = a.replace("@2", e); 
        a = a.replace("@3", u); 
        $hist.append(a) 
    }; 
    this.remove = function (e) { 
        var n = parseFloat(e.attr("value")); 
        t = parseFloat((t - n).toFixed(2)); 
        e.remove();
        atualizaTotal(t);
    }; 
    var atualizaTotal = function (e) {
        n.text(formatVirgula(e.toFixed(2))); 
        r.val(e.toFixed(2));
        t = e;
    } 
} 

function igual() { 
    var e = tratarParaEval($visor.val()); 
    var t = resolve(e); 
    if (t !== false) { 
        grid.add(t); 
        e = formatVirgula(t) 
    } else { 
        e = formatVirgula(e); 
        $visor.val(e); 
        return false 
    } 
    $visor.val(e); 
    return true 
}

function resolve(expr) { 
    expr = expr.toString(); 
    if (expr == "") 
        return false; 
    if (!verificaDivisao(expr)) { 
        return false 
    } 
    if (/(\+|-|\*|\/)$/g.test(expr)) 
        return false; 
    var valor = eval(expr); 
    if (valor == NaN) { 
        alert("Não foi possivel calcular"); 
        return false 
    } else if (valor == Number.MAX_VALUE) { 
        alert("O resultado ultrapassa o valor maximo permitido."); 
        return false 
    } else if (valor == Number.POSITIVE_INFINITY) { 
        alert("O resultado é um numero positivo infinito"); 
        return false 
    } else if (valor == Number.NEGATIVE_INFINITY) { 
        alert("O resultado é um numero negativo infinito"); 
        return false 
    } 
    return valor 
}

function tratarVisor() { 
    $visor.val(tratarParaEval($visor.val())) 
} 

function tratarParaEval(e) { 
    e = e.toString(); 
    e = e.replace(/,/g, "."); 
    e = e.replace(/^(0+)$/, "0"); 
    return e 
}

function formatVirgula(e) { 
    e = e.toString(); 
    e = e.toString().replace(/(\.)/g, ","); 
    return e 
}

function apagarUm() { 
    var e = $visor.val(); 
    if (e.length > 0) { 
        e = e.substring(0, e.length - 1) 
    } 
    $visor.val(e) 
}

function virgula(e) { 
    var t = tratarParaEval($visor.val()); 
    if (t == "") { 
        t = "0." 
    } else if (t == "0") { 
        t += "." 
    } else if (/^((\+|-)?\d+)$/.test(t)) { 
        t += "." 
    } else if (/((\+|-|\*|\/)\d+)$/.test(t)) { 
        t += "." 
    } 
    t = formatVirgula(t); 
    $visor.val(t); 
    e.preventDefault(); 
    return false 
}

function apagar() { 
    $visor.val("") 
} 

function raiz() { 
    var e = tratarParaEval($visor.val()); 
    if (/^(\+?(\d+\.)?\d+)$/.test(e)) { 
        var t = parseFloat(e); 
        e = Math.sqrt(t) 
    } else { 
        alert("Utilize apenas numeros e que sejam positivos") 
    } 
    e = formatVirgula(e); 
    $visor.val(e.toString()) 
}

function maisMenos() { 
    var e = tratarParaEval($visor.val()); 
    var t = /^((\+|-)?((\d+\.)?\d+))$/; 
    if (t.test(e)) { 
        var n = parseFloat(e); 
        e = (n * -1).toString() 
    } 
    e = formatVirgula(e); 
    $visor.val(e) 
}

function teclasDown(e) { 
    var t = e.which; 
    var prevent = function (e) { 
        e.preventDefault(); 
        e.stopPropagation(); 
        return false 
    }; 
    if (t == 8) { 
        apagarUm(); 
        return prevent(e) 
    } else if (t == 13) { 
        igual(); 
        return prevent(e) 
    } else if (t == 27) { 
        apagar(); 
        return (e) 
    } else if (t == 46) { 
        ce(); 
        return prevent(e) 
    } 

    if (t == 96) 
        return true; 
    else if (t == 97) 
        return true; 
    else if (t == 98) 
        return true; 
    else if (t == 99) 
        return true; 
    else if (t == 100) 
        return true; 
    else if (t == 101) 
        return true; 
    else if (t == 102) 
        return true; 
    else if (t == 103) 
        return true; 
    else if (t == 104) 
        return true; 
    else if (t == 105) 
        return true; 
    else if (t == 110) { 
        virgula(e) 
    } else if (t == 194) { 
        virgula(e) 
    } else if (t == 111) { 
        setOpk("/"); 
        return prevent(e) 
    } else if (t == 106) { 
        setOpk("*"); 
        return prevent(e) 
    } else if (t == 109) { 
        setOpk("-"); 
        return prevent(e) 
    } else if (t == 107) { 
        setOpk("+"); 
        return prevent(e) 
    } 

    event.preventDefault();
    event.stopPropagation();
    return false;
} 

function porcento() { 
    var e = tratarParaEval($visor.val()); 
    var t = /^(((\+|-)?(\d+\.)?\d+)(\+|-|\*|\/)(\d*\.?\d+))$/; 
    var n = /((\d+\.)?\d+)$/; 
    var r = function () { 
        alert("Expressão não permitida, utilize por ex.(2 + 3 %) neste caso 2 mais 3 porcento de 2.") 
    }; 
    if (t.test(e)) { 
        var i = parseFloat(t.exec(e)[2]); 
        var s = parseFloat(n.exec(e)[1]); 
        var o = s / 100 * i; e = e.replace(n, o.toString()) 
    } else { 
        r() 
    } 
    e = formatVirgula(e); 
    $visor.val(e) 
}
 
function ce() { 
    var e = tratarParaEval($visor.val()); 
    if (/((\+|-|\*|\/)(\d+\.)?\d+)$/.test(e)) { 
        e = e.replace(/((\d+\.)?\d+)$/, "") 
    } 
    e = formatVirgula(e); $visor.val(e) 
}

function umDivide(e) { 
    var t = tratarParaEval($visor.val()); 
    if (/^((\+|-)?(\d+\.)?\d+)$/.test(t)) { 
        t = 1 / parseFloat(t); 
        t = formatVirgula(t); 
        $visor.val(t) 
    } else { 
        alert("Informe apenas numeros.") 
    } 
}

function reading(e) { 
    $visor = $("#visor"); 
    $hist = $("#historico"); 
    $(".borda-buttons .btn > input").each(function () { 
        var e = $(this); 
        if (this.id == "apagar-um") { 
            e.click(apagarUm) 
        } else if (this.id == "ce") { 
            e.click(ce) 
        } else if (this.id == "porcentagem") { 
            e.click(porcento) 
        } else if (this.id == "maismenos") { 
            e.click(maisMenos) 
        } else if (this.id == "igual") { 
            e.click(igual) 
        } else if (this.id == "virgula") { 
            e.click(virgula) 
        } else if (this.id == "apagar") { 
            e.click(apagar) 
        } else if (this.id == "raiz") { 
            e.click(raiz) 
        } else if (this.id == "menos") { 
            e.click(setOp) 
        } else if (this.id == "vezes") { 
            e.click(setOp) 
        } else if (this.id == "umbx") { 
            e.click(umDivide) 
        } else if (/^(\+|\/)$/.test(e.val())) { 
            e.click(setOp) 
        } else if (/^(\d)$/i.test(e.val())) { 
            e.click(setN) 
        } 
    }); 
    $visor.keydown(teclasDown); 
    $(document).on("click", ".row-exclui", excluirResultado); 
    grid = new TotalGrid 
} 

var grid; 

// Chamando a função de window/self
$(window).load(reading);

(function ($) {
    $.fn.addVal = function (valor) {
        if (valor == null)
            return;
        if (this.length < 1)
            return;
        return this.val(this.val().concat(valor.toString()));
    };
})(jQuery);