#[starknet::interface]
pub trait ISetterGetter<TContractState> {
    fn set_name(ref self: TContractState, _name: felt252);
    fn get_name(self: @TContractState) -> felt252;
}

#[starknet::contract]
mod SetterGetter {
    #[storage]
    struct Storage {
        name: felt252, 
    }

    #[abi(embed_v0)]
    impl SetterGetterImpl of super::ISetterGetter<ContractState> {
        fn set_name(ref self: ContractState, _name: felt252) {
       
            self.name.write(_name);
        }

        fn get_name(self: @ContractState) -> felt252 {
            self.name.read()
        }
    }
}
