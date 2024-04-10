Feature: Consultar pokemones por su nombre

    @consultarXNombre
    Scenario: consultar pokemon por su nombre
        Given que tengo el pokemon llamado "squirtle"
        When consulto el pokemon por su nombre
        Then la respuesta al consultar el pokemon debe ser 200

    @consultarEvoluciones
    Scenario: consultar el nombre de las evoluciones del pokemon
        Given que tengo el pokemon llamado "squirtle"
        When consulto el pokemon por su nombre
        Then la respuesta al consultar el pokemon debe ser 200
        When consulto la especie del pokemon
        Then la respuesta al consultar la especie del pokemon debe ser 200
        When finalmente consulto las evoluciones del pokemon
        Then la respuesta al consultar la evoluciones del pokemon debe ser 200
        And la etapas de evolucion del pokemon deben ser:
        #La mayoria de los pokemones solo tienen 2 etapas de evolución :)
            | nombre   | etapaIntermedia | etapaFinal |
            | squirtle | wartortle       | blastoise  |


