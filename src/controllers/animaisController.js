import * as PetModel from './../models/animaisModel.js'

export const listarTodos = async (req, res) => {
    try{
        const animais = await PetModel.findAll();
        if (animais || animais.length === 0) {
            res.status(404).json({
                total: animais.length,
                mensagem: 'Não há animais na lista',
                animais
            })
        }
        res.status(200).json({
            total: animais.length,
            mensagem: 'Lista de animais',
            animais
        })

} catch (error) {
    res.status(500).json({
        erro: 'Erro interno de servidor',
        detalhes: error.message,
        status: 500
        })
    }
}

export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const pet = await PetModel.findById(id);

        if (!pet) {
            return res.status(404).json({
                erro: 'Animal não encontrado!',
                mensagem: 'Verifique se o id do animal existe',
                id: id
            })
        }

        res.status(200).json({
            mensagem: 'animal encontrado',
            pet
        })
        
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar animal por id',
            detalhes: error.message
        })
    }
}

export const criar = async (req,res) => {
    try {
        const { nome, especie, idade, dono } = req.body

        const dado = req.body

        //Validação campos obrigatórios
        const camposObrigatorios = ['nome', 'especie', 'idade', 'dono'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        const novoAnimal = await PetModel.create(dado);

        res.status(201).json({
            mensagem: 'Pet criado com sucesso!',
            pet: novoAnimal
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar Pet',
            detalhes: error.message
        })
    }
}
