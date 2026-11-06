#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegPairsDef {
    static constexpr std::uint8_t opcode = 0x48;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_PAIRS";
    static constexpr std::string_view desc = "Write array of (register, value) context pairs";
};
}
